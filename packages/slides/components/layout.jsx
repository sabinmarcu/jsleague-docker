import React, { Fragment } from 'react';
import { Flex, Heading, Image } from 'rebass';

let globalTitle = 'Intro to Docker';
let globalSubtitle = null;

export const setDefaultTitle = title => { globalTitle = title };
export const SectionTitle = ({ children }) => setDefaultTitle(children && children.length > 0 && children || null) || <Fragment />
export const setDefaultSubtitle = subtitle => { globalSubtitle = subtitle };
export const SectionSubtitle = ({ children }) => setDefaultSubtitle(children && children.length > 0 && children || null) || <Fragment />

export default ({ 
  children, 
  height = 50, 
  noTitle = false, 
  noSubtitle = false,
  title, 
  subtitle,
  background, 
  icon,
  header = false,
  style = {},
  ...rest
}) => (
  <Flex
    as="div"
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      background: header ? '#f9e476' : (background ? `url(${background})` : ''),
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      ...style,
    }}
  >
    <Flex
      justifyContent="flex-start"
      height={height}
    >
      <Flex 
        maxWidth={1000} 
        px={25} 
        height="100%"
        alignItems="center"
      >
        <Image 
            src={icon ? icon : 'https://jsleague.ro/images/logo/logo-flat.png'}
          p={height / 5}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            backgroundSize: "cover",
          }}
        />
        {!noTitle && (title || globalTitle) && <Heading
          fontSize="14px"
          fontFamily="inherit"
        >
          {`${title ? title : globalTitle}`}
        </Heading>}
        {!noSubtitle && (subtitle || globalSubtitle) && <Heading
          fontSize="14px"
          fontFamily="inherit"
          pl={1}
        >
          {` - ${subtitle ? subtitle : globalSubtitle}`}
        </Heading>}
      </Flex>
    </Flex>
    <Flex
      as="div"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      flex={1}
    >
      {children}
    </Flex>
  </Flex>
);