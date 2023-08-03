import React, {useCallback, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import n from 'helper/normalize';
import {StyleSheet, View} from 'react-native';

export const Sv = styled.View`
  /* width와 height */
  ${props =>
    typeof props.w == 'string' ? w_string : typeof props.w == 'number' && w}
  ${props =>
    typeof props.h == 'string' ? h_string : typeof props.h == 'number' && h}

  /* flex */
${props => props.f && f}

/* border */
${props => props.b && b}
${props => props.br && br}


  /* 정렬 속성 */
  ${props => props.row && row}
  ${props => props.col && col}
  ${props => props.ct && ct}
  ${props => props.aed && aed}
  ${props => props.jed && jed}
  ${props => props.ast && ast}
  ${props => props.jst && jst}
  ${props => props.act && act}
  ${props => props.jct && jct}
  ${props => props.jsb && jsb}

  /* gap */
  ${props => props.g && g}
  ${props => props.gx && gx}
  ${props => props.gy && gy}

  /*마진 속성*/
  ${props => props.m && m}
  ${props => props.mt && mt}
  ${props => props.mb && mb}
  ${props => props.ml && ml}
  ${props => props.mr && mr}
  ${props => props.mx && mx}
  ${props => props.my && my}

  /*패딩 속성*/
  ${props => props.p && p}
  ${props => props.pt && pt}
  ${props => props.pb && pb}
  ${props => props.pl && pl}
  ${props => props.pr && pr}
  ${props => props.px && px}
  ${props => props.py && py}


  /*background*/
  ${props => props.bg && bg}

  /* display none */
  ${props => props.hidden && hidden}

    ${props => props.opacity && opacity}




  ${props => props.center && center}
  ${props => props.left && left}
  ${props => props.right && right}
`;

const w = css`
  width: ${props => n(props.w)}px;
`;

const w_string = css`
  width: ${props => props.w};
`;

const h = css`
  height: ${props => n(props.h)}px;
`;

const h_string = css`
  height: ${props => props.h};
`;

const f = css`
  display: flex;
  flex: ${props => props.f};
`;

const b = css`
  border: ${props => props.b};
`;

const br = css`
  border-radius: ${props => props.br}px;
`;

const bg = css`
  background-color: ${props => props.bg && props.bg};
`;

const row = css`
  display: flex;
  flex-direction: row;
`;
const col = css`
  display: flex;
  flex-direction: column;
`;

const ct = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const jsb = css`
  display: flex;
  justify-content: space-between;
`;

const ast = css`
  display: flex;
  align-items: flex-start;
`;

const jst = css`
  display: flex;
  justify-content: flex-start;
`;

const aed = css`
  display: flex;
  align-items: flex-end;
`;

const jed = css`
  display: flex;
  justify-content: flex-end;
`;

const jct = css`
  display: flex;
  justify-content: center;
`;

const act = css`
  display: flex;
  align-items: center;
`;

const g = css`
  display: flex;
  gap: ${props => n(props.g)}px;
`;

const gx = css`
  display: flex;
  column-gap: ${props => n(props.gx)}px;
`;

const gy = css`
  display: flex;
  row-gap: ${props => n(props.gy)}px;
`;

const center = css`
  text-align: center;
`;
const left = css`
  text-align: left;
`;
const right = css`
  text-align: right;
`;
//------------------------------------------------------------------
const p = css`
  padding: ${props => n(props.p)}px !important;
`;
const pt = css`
  padding-top: ${props => n(props.pt)}px !important;
`;
const pb = css`
  padding-bottom: ${props => n(props.pb)}px !important;
`;
const pl = css`
  padding-left: ${props => n(props.pl)}px !important;
`;
const pr = css`
  padding-right: ${props => n(props.pr)}px !important;
`;
const px = css`
  padding-left: ${props => n(props.px)}px !important;
  padding-right: ${props => n(props.px)}px !important;
`;
const py = css`
  padding-top: ${props => n(props.py)}px !important;
  padding-bottom: ${props => n(props.py)}px !important;
`;
//------------------------------------------------------------------
const m = css`
  margin: ${props => n(props.m)}px !important;
`;
const mt = css`
  margin-top: ${props => n(props.mt)}px !important;
`;
const mb = css`
  margin-bottom: ${props => n(props.mb)}px !important;
`;
const ml = css`
  margin-left: ${props => n(props.ml)}px !important;
`;
const mr = css`
  margin-right: ${props => n(props.mr)}px !important;
`;
const mx = css`
  margin-left: ${props => n(props.mx)}px !important;
  margin-right: ${props => n(props.mx)}px !important;
`;
const my = css`
  margin-top: ${props => n(props.my)}px !important;
  margin-bottom: ${props => n(props.my)}px !important;
`;
//------------------------------------------------------------------

const hidden = css`
  display: none !important;
`;

const opacity = css`
  opacity: ${props => props.opacity} !important;
`;
