import { Box, ButtonGroup, Button, ButtonOutline, Text } from "@primer/components";
import React from "react";
import Seo from "gatsby-theme-primer-wiki/src/components/seo";
import { navigate } from 'gatsby';

const NotFoundPage = ({ data, location }) => { 
  return ( 
    <>
      <Seo post={{ title: "404: Not Found" }} />
      <Box 
        display="flex"
        flexDirection="column"
        minHeight="100vh" 
        bg="bg.primary"
        color="text.primary"
        justifyContent="center"
      > 
        <Box
          maxWidth="80rem"
          margin="auto"
          padding="4rem 6rem"
        >
          <Box
            borderColor="border.primary"
            borderWidth={1}
            borderStyle="solid"
            p={3}
          >
            <Text as='span' fontWeight="bold" color="text.primary">🚧 404: NOT_FOUND</Text>
            <Text as='span' ml={1}>페이지를 찾을 수 없습니다.</Text>
            <Text as='p' mt={2}>페이지가 존재하지 않거나, 현재 작성 중인 문서입니다.</Text>
          </Box>
          <ButtonGroup display="block" my={2}>
            <Button onClick={() => navigate(-1)}>이전 페이지로</Button>
            <ButtonOutline onClick={() => navigate("/")}>위키 홈으로 돌아가기</ButtonOutline>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default NotFoundPage;