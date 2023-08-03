import React, {useCallback, useEffect, useState} from 'react';
import {colors} from 'styles/colors';
import {gs} from 'styles/globalStyles';
import styled, {css} from 'styled-components';
import n from 'helper/normalize';
import {StyleSheet, View, Text} from 'react-native';

export const St = props => (
  <Stt {...props} allowFontScaling={false}>
    {props.children}
  </Stt>
);

const Stt = styled.Text`
  color: black;

  ${props => props.h1 && h1}
  ${props => props.h2 && h2}
  ${props => props.h3 && h3}
  ${props => props.s1 && s1}
  ${props => props.s2 && s2}
  ${props => props.s3 && s3}
  ${props => props.s4 && s4}
  ${props => props.b1 && b1}
  ${props => props.b2 && b2}
  ${props => props.b3 && b3}
  ${props => props.c1 && c1}
  ${props => props.c2 && c2}
  ${props => props.c3 && c3}

  ${props => props.primary && primary}
  ${props => props.secondary && secondary}
  ${props => props.black && black}
  ${props => props.g0 && g0}
  ${props => props.g1 && g1}
  ${props => props.g2 && g2}
  ${props => props.g3 && g3}
  ${props => props.g4 && g4}
  ${props => props.g5 && g5}
  ${props => props.g6 && g6}
  ${props => props.g7 && g7}
  ${props => props.white && white}
  ${props => props.red && red}

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

  ${props => props.center && center}
  ${props => props.left && left}
  ${props => props.right && right}

  ${props => props.bold && bold}
  ${props => props.underLine && underLine}
`;
const h1 = css`
  font-weight: bold;
  font-size: ${n(36)}px;
  line-height: ${n(50)}px;
`;
const h2 = css`
  font-weight: bold;
  font-size: ${n(28)}px;
  line-height: ${n(39)}px;
`;
const h3 = css`
  font-weight: bold;
  font-size: ${n(24)}px;
  line-height: ${n(34)}px;
`;
const s1 = css`
  font-weight: bold;
  font-size: ${n(18)}px;
  line-height: ${n(25)}px;
`;
const s2 = css`
  font-weight: bold;
  font-size: ${n(16)}px;
  line-height: ${n(22)}px;
`;
const s3 = css`
  font-weight: bold;
  font-size: ${n(14)}px;
  line-height: ${n(20)}px;
`;
const s4 = css`
  font-weight: bold;
  font-size: ${n(12)}px;
  line-height: ${n(17)}px;
`;
const s5 = css`
  font-weight: bold;
  font-size: ${n(11)}px;
  line-height: ${n(15)}px;
`;
const b1 = css`
  font-weight: 400;
  font-size: ${n(16)}px;
  line-height: ${n(22)}px;
`;
const b2 = css`
  font-weight: 400;
  font-size: ${n(14)}px;
  line-height: ${n(20)}px;
`;
const c1 = css`
  font-weight: 500;
  font-size: ${n(13)}px;
  line-height: ${n(18)}px;
`;
const c2 = css`
  font-weight: 500;
  font-size: ${n(12)}px;
  line-height: ${n(17)}px;
`;
const c3 = css`
  font-weight: 500;
  font-size: ${n(10)}px;
  line-height: ${n(14)}px;
`;

const primary = css`
  color: ${colors.primary};
`;
const secondary = css`
  color: ${colors.secondary};
`;
const black = css`
  color: ${colors.black};
`;
const g0 = css`
  color: ${colors.g0};
`;
const g1 = css`
  color: ${colors.g1};
`;
const g2 = css`
  color: ${colors.g2};
`;
const g3 = css`
  color: ${colors.g3};
`;
const g4 = css`
  color: ${colors.g4};
`;
const g5 = css`
  color: ${colors.g5};
`;
const g6 = css`
  color: ${colors.g6};
`;
const g7 = css`
  color: ${colors.g7};
`;
const white = css`
  color: ${colors.white};
`;
const red = css`
  color: ${colors.red};
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

const bold = css`
  font-weight: bold;
`;
const underLine = css`
  text-decoration-line: underline;
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
