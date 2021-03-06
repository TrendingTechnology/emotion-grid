/** @jsx jsx */
import { FC } from 'react';

import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';

import { config, constants } from '../../config';
import { media } from '../../utils';
import { Types } from '../../types';

const baseStyle = ({ theme }: Types.StyleProps) => css`
  label: col;

  position: relative;

  flex-basis: 0;
  flex-grow: 1;

  width: 100%;
  max-width: 100%;

  box-sizing: border-box;

  ${constants.BREAKPOINTS.map(
    (breakpoint) =>
      css`
        ${media(breakpoint)} {
          padding-left: ${config(theme).gutter[breakpoint] / 2}rem;
          padding-right: ${config(theme).gutter[breakpoint] / 2}rem;
        }
      `
  )}
`;

const sizeStyle = (props: Types.StyleProps & Types.ColProps) => {
  const { theme } = props;

  return css`
    ${constants.BREAKPOINTS.map(
      (breakpoint) =>
        props[breakpoint] &&
        css`
          ${media(breakpoint)} {
            flex: 0 0
              ${(props[breakpoint] / config(theme).columns[breakpoint]) * 100}%;
            max-width: ${(props[breakpoint] /
              config(theme).columns[breakpoint]) *
            100}%;
          }
        `
    )}
  `;
};

const offsetStyle = ({ theme, offset }: Types.StyleProps & Types.ColProps) =>
  offset &&
  (typeof offset === 'object'
    ? constants.BREAKPOINTS.map(
        (breakpoint) =>
          offset[breakpoint] &&
          css`
            ${media(breakpoint)} {
              margin-left: ${offset[breakpoint] > 0
                ? (offset[breakpoint] / config(theme).columns[breakpoint]) * 100
                : 0}%;
            }
          `
      )
    : css`
        margin-left: ${(offset / config(theme).columns['xs']) * 100}%;
      `);

const BaseCol: FC<Types.ColProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export const Col = styled(BaseCol)<Types.ColProps>(
  baseStyle,
  sizeStyle,
  offsetStyle
);
