import {colors} from 'styles/colors';
import {StyleSheet} from 'react-native';
import n from 'helper/normalize';

export const gs = StyleSheet.create({
  h1: {
    fontFamily: 'Pretendard',
    fontSize: n(36),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(42),
    textAlign: 'left',
  },
  h2: {
    fontFamily: 'Pretendard',
    fontSize: n(28),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(36),
    textAlign: 'left',
  },
  h3: {
    fontFamily: 'Pretendard',
    fontSize: n(24),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(32),
    textAlign: 'left',
  },
  h4: {
    fontFamily: 'Pretendard',
    fontSize: n(24),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(32),
    textAlign: 'left',
  },
  s1: {
    fontFamily: 'Pretendard',
    fontSize: n(20),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: n(24),
    textAlign: 'left',
  },

  s2: {
    fontFamily: 'Pretendard',
    fontSize: n(16),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: n(24),
    textAlign: 'left',
  },

  s3: {
    fontFamily: 'Pretendard',
    fontSize: n(14),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: n(20),
    textAlign: 'left',
  },

  s4: {
    fontFamily: 'Pretendard',
    fontSize: n(12),
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: n(18),
    textAlign: 'left',
  },

  b1: {
    fontFamily: 'Pretendard',
    fontSize: n(16),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(24),
    textAlign: 'left',
  },

  b2: {
    fontFamily: 'Pretendard',
    fontSize: n(14),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(20),
    textAlign: 'left',
  },

  c1: {
    fontFamily: 'Pretendard',
    fontSize: n(12),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(16),
    textAlign: 'left',
  },

  c2: {
    fontFamily: 'Pretendard',
    fontSize: n(11),
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: n(12),
    textAlign: 'left',
  },

  divider1: {
    height: n(1),
    width: '100%',
    backgroundColor: colors.gray6,
  },

  divider4: {
    height: n(4),
    width: '100%',
    backgroundColor: colors.gray6,
  },

  divider8: {
    height: n(8),
    width: '100%',
    backgroundColor: colors.gray7,
  },
});
