---
title   : NestJS AWS S3를 이용한 파일 업로드
date    : 2022-11-09 21:26:45 +0900
updated : 2022-11-09 21:34:16 +0900
aliases : ["NestJS AWS S3를 이용한 파일 업로드"]
tags: ["NestJS"]
draft : false
---


## AWS S3란?
- AWS S3(Amazon Simple Service)
- 객체 스토리지 서비스
- **파일 서버의 역할을 하는 서비스**
  - 일반적인 파일 서버는 트래픽이 증가하면 장비를 증설하는 작업을 해야하는데 S3가 이를 대행한다고 한다. 트래픽에 따른 걱정이 필요가 없어지는 것이다. 그리고 파일에 대한 접근 권한 지정도 가능하다.

### 용어
- 객체: AWS는 S3에 저장된 데이터를 객체라고 한다. 즉 파일이다.
- 버킷: 객체가 파일이라면 버킷은 연관된 객체들을 모은 최상위 디렉토리라할 수 있다. 

---

이번에 이미지 업로드를 S3에 하기로 하면서 작동했으면 하는 프로세스는 다음과 같았다.
1. API 요청에 파일을 전달한다.
2. S3에 파일이 업로드 된다.
3. 업로드된 파일의 url을 client로 가져오자! 

## NestJS에서 준비할 것
Nest는 파일 업로드를 위해 [multer](https://github.com/expressjs/multer) 미들웨어에 기반한 모듈을 제공한다. 
> Multer는 파일 업로드를 위해 사용되는 multipart/form-data 를 다루기 위한 node.js의 미들웨어 

### 패키지 설치
`aws-sdk` 설치: JavaScript용 AWS SDK, API를 통해 AWS 서비스를 쉽게 호출한다.
```
$ npm install --save aws-sdk
```
`@types/multer` : type safety를 위해 설치한다. 
```
$ npm i -D @types/multer
```



### 코드 작성하기 
우선 다른 서비스와 구분을 위해 `image`라는 모듈을 만들자. 다음과 같이 module, controller, service를 만든다.

그럼 프레임워크가 ~~알아서(?)~~ 모듈, 컨트롤러, 서비스를 잘 연결해주는 모습을 확인할 수 있다.
```
$ nest g mo image
$ nest g co image --no-spec
$ nest g s image --no-spec
```

루트 디렉토리에 `.env` 파일을 만들어서 AWS 연결시 필요한 정보들을 작성해둔다.
```
AWS_S3_BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-northeast-2
AWS_S3_URL_HOST=
```

Controller를 다음과 같이 작성한다.
```typescript
// image.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageResponseDto } from './dto/image-response.dto';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file): Promise<ImageResponseDto> {
    return this.imageService.uploadFile(file);
  }
}
```
우리는 단일 파일을 업로드할 것이다. 라우트 핸들러에서 `@FileInterceptor`를 연결한다.  
그리고 `@UploadedFile()` 데코레이터를 사용해 request로부터 파일을 추출하면 된다.
여러 개를 업로드 한다면 `@UploadedFiles` 데코레이터를 사용하면 된다. 

Service는 다음과 같이 작성한다. 
요기서 본격적으로 S3 버킷에 파일을 업로드하는 로직이 작성된다. 

```typescript
// image.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  constructor(private configService: ConfigService) {}
  async uploadFile(file) {
    AWS.config.update({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    try {
      const Key = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Key,
          Body: file.buffer,
          Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
        })
        .promise();

      const url = this.configService.get<string>('AWS_S3_URL_HOST') + Key;
      return { url };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
```
우리는 버킷은 이미 만들었기 때문에 환경변수에 적절한 값들을 넣어준 뒤, url을 반환하면 되겠다.  
`putObject`에 전달한 `Key` 값으로 파일이 업로드될 것이다. 
파일명 중복을 방지하기 위해 `Date`를 사용했다.


## 번외) Swagger에서 file upload 테스트 하기
기왕 Swagger를 사용하고 있으니 file upload도 테스트해보고 싶었다.
라우트 핸들러에 아래와 같이 작성하면 된다.
```typescript
@ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
```

## 느낀점
- AWS S3와 NestJS의 조합이 정말 간편하다는 생각이 들었다. 

## 참고자료
- [NestJS - file upload](https://docs.nestjs.com/techniques/file-upload)
- [초보자도 이해할 수 있는 S3](https://dev.classmethod.jp/articles/for-beginner-s3-explanation/)
- [https://velog.io/@baik9261/Nest-JS-AWS-S3-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C](https://velog.io/@baik9261/Nest-JS-AWS-S3-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C)
- [https://velog.io/@suasue/NestJS-AWS-S3-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C](https://velog.io/@suasue/NestJS-AWS-S3-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C)