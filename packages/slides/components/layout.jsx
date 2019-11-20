import React, { Fragment } from 'react';
import { Flex, Heading, Image, Box } from 'rebass';
import { useDeck } from 'mdx-deck';
import { navigate } from '@reach/router'

const moveTo = ({ slug, length, index, setState }) => {
  const n = index
  if (n >= length || n < 0) return
  navigate([slug, n].join('/'))
  setState({ step: 0 })
}

let globalTitle = 'Intro to Docker';
let globalSubtitle = null;

export const setDefaultTitle = title => { globalTitle = title };
export const SectionTitle = ({ children }) => setDefaultTitle(children && children.length > 0 && children || null) || <Fragment />
export const setDefaultSubtitle = subtitle => { globalSubtitle = subtitle };
export const SectionSubtitle = ({ children }) => setDefaultSubtitle(children && children.length > 0 && children || null) || <Fragment />

export default ({ 
  children, 
  height = 50, 
  dotsHeight = 50,
  dotsColor = "#aaa",
  headingDotsColor = "#000",
  noTitle = false, 
  noSubtitle = false,
  noDots = false,
  title, 
  subtitle,
  background, 
  icon,
  header = false,
  style = {},
  ...rest
}) => {
  const state = useDeck();
  const { index, length, step, steps } = state;
  const dotStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `${dotsHeight / 3}px`,
    height: `${dotsHeight / 3}px`,
    fontSize: `${dotsHeight / 3}px`,
    lineHeight: `${dotsHeight / 3}px`,
    margin: `${dotsHeight / 10}px`,
    cursor: 'pointer',
  };
  return (
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
        flex={`0 0 ${height}px`}
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
        flex={"1"}
        p={50}
        maxHeight={`calc(100% - ${height + (noDots ? 0 : dotsHeight)}px)`}
      >
        {children}
      </Flex>
      {!noDots && <Flex
        alignItems="center"
        justifyContent="center"
        height={dotsHeight}
        flex={`0 0 ${dotsHeight}`}
      >
        <Box
          key="left"
          sx={{
            ...dotStyle,
            color: header ? headingDotsColor : dotsColor,
            opacity: index === 0 ? 0 : 1,
            cursor: index === 0 ? 'default' : 'pointer',
          }}
          onClick={() => moveTo({ ...state, index: index - 1 })}
        >
          &lt;
        </Box>
        {(new Array(length)).fill(0).map((_, idx) => (
          <Box
            key={idx}
            onClick={() => moveTo({ ...state, index: idx })}
            sx={{
              ...dotStyle,
              borderRadius: "100%",
              border: `solid 2px ${header ? headingDotsColor : dotsColor}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box 
              sx={{
                content: '',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 0,
                backgroundColor: header ? headingDotsColor : dotsColor,
                ...(index === idx && {
                  height: steps > 0 ? `${(step + 1)/(steps + 1) * 100}%` : '100%',
                }),
              }}

            />
          </Box>
        ))}
        <Box
          key="right"
          sx={{
            ...dotStyle,
            color: header ? headingDotsColor : dotsColor,
            opacity: index === length - 1 ? 0 : 1,
            cursor: index === length - 1 ? 'default' : 'pointer',
          }}
          onClick={() => moveTo({ ...state, index: index + 1 })}
        >
          &gt;
        </Box>
      </Flex>}
    </Flex>
  );
};