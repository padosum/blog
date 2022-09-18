import { Box, Link } from '@primer/components'
import React from 'react'
import { useScrollSpy } from 'gatsby-theme-primer-wiki/src/hooks/use-scrollspy'
import styled from 'styled-components'

const FolderItem = styled.div`
  padding-left: ${props => (props.depth > 0 ? '6px' : 0)};
  &:before {
    margin-top: -17px;
    position: absolute;
    content: '';
    height: 30px;
    border-style: dotted;
    border-color: rgb(102, 102, 102);
    border-width: 0px 0px 1px 1px;
    width: 5px;
  }
`

function TableOfContents({ items, depth }) {
  const activeId = useScrollSpy(
    items.map(({ url }) => `[id="${url.slice(1)}"]`),
    {
      rootMargin: '0% 0% -24% 0%',
    }
  )

  console.log({ items, depth })
  return (
    <Box as="ul" m={0} p={0} css={{ listStyle: 'none' }}>
      {items.map(item => (
        <FolderItem as="li" key={item.url} depth={depth}>
          {item.title ? (
            <>
              <Link
                display="block"
                ml={1}
                py={1}
                href={item.url}
                fontSize={[2, null, 1]}
                color="auto.gray.6"
                bg="bg.post"
                sx={{
                  fontWeight: item.url === `#${activeId}` ? 'bold' : 'medium',
                }}
                aria-current={
                  item.url === `#${activeId}` ? 'location' : undefined
                }
              >
                {depth === 0 ? (
                  <img src={'/disk.png'} bg="bg.primary" alt="disk"></img>
                ) : (
                  <img src={'/folder.ico'} bg="bg.primary" alt="folder"></img>
                )}
                {item.title}
              </Link>
            </>
          ) : null}
          {item.items ? (
            <TableOfContents items={item.items} depth={depth + 1} />
          ) : null}
        </FolderItem>
      ))}
    </Box>
  )
}

TableOfContents.defaultProps = {
  depth: 0,
}

export default TableOfContents
