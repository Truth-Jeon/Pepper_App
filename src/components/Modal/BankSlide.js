import {BankButton} from 'components/Button/BankButton';
import React from 'react';
import {SectionList} from 'react-native';
import {ModalSlide} from './ModalSlide';
import {St, Sv} from 'components/index';

import koreaInvestmentSecurities from './images/korea-investment-securities.png';
import hana from './images/hana.png';
import tossBank from './images/toss-bank.png';
import kebBank from './images/keb-bank.png';
import kakaoBank from './images/kakao-bank.png';
import jeju from './images/jeju.png';
import jeonbuk from './images/jeonbuk.png';
import savingsBank from './images/savings-bank.png';
import postOffice from './images/post-office.png';
import woori from './images/woori.png';
import citi from './images/citi.png';
import shinhyup from './images/shinhyup.png';
import shinhan from './images/shinhan.png';
import suhyup from './images/suhyup.png';
import saemaeul from './images/saemaeul.png';
import forestry from './images/forestry.png';
import busan from './images/busan.png';
import daegu from './images/daegu.png';
import gwangju from './images/gwangju.png';
import gyeongnam from './images/gyeongnam.png';
import scFirst from './images/sc-first.png';
import nhNonghyup from './images/nh-nonghyup.png';
import kdbIndustry from './images/kdb-industry.png';
import kbKookmin from './images/kb-kookmin.png';
import ibkEnterprise from './images/ibk-enterprise.png';
import hsbc from './images/hsbc.png';
import deutscheBank from './images/deutsche-bank.png';
import jp from './images/jp.jpeg';

import boa from './images/broker/boa.png';
import bnpParibas from './images/broker/bnp-paribas.png';

import kyoboSecurities from './images/broker/kyobo-securities.jpg';
import yuantaSecurities from './images/broker/yuanta-securities.jpg';
import kbSecurities from './images/broker/kb-securities.jpg';
import miraeAssetSecurities from './images/broker/mirae-asset-securities.jpg';
import samsungSecurities from './images/broker/samsung-securities.jpg';
import nhInvestmentSecurities from './images/broker/nh-investment-securities.jpg';
import hiInvestmentSecurities from './images/broker/hi-investment-securities.jpg';
import hyundaiCarSecurities from './images/broker/hyundai-car-securities.jpg';
import kiwoomSecurities from './images/broker/kiwoom-securities.jpg';
import ebestInvestmentSecurities from './images/broker/ebest-investment-securities.jpg';
import skSecurities from './images/broker/sk-securities.jpg';
import daishinSecurities from './images/broker/daishin-securities.jpg';
import hanwhaSecurities from './images/broker/hanwha-securities.jpg';
import hanaDaetooSecurities from './images/broker/hana-daetoo-securities.jpg';
import tossSecurities from './images/broker/toss-securities.jpg';
import shinhanFinancialInvestment from './images/broker/shinhan-financial-investment-securities.jpg';
import dbFinancialInvestments from './images/broker/db-financial-investments.jpg';
import yujinSecurities from './images/broker/yujin-securities.jpg';
import meritzSecurities from './images/broker/meritz-securities.jpg';
import bugokSecurities from './images/broker/bugok-securities.jpg';

import shinyoungInvestment from './images/broker/shinyoungInvestment.jpg';
import CapeInvestmentSecurities from './images/broker/CapeInvestmentSecurities.jpg';

const items = [
  {
    title: '은행',
    data: [
      [
        {label: '산업은행', value: '002', img: kdbIndustry, type: 'bank'},
        {label: '기업', value: '003', img: ibkEnterprise, type: 'bank'},
      ],
      [
        {label: '국민은행', value: '004', img: kbKookmin, type: 'bank'},
        {label: '수협은행', value: '007', img: suhyup, type: 'bank'},
      ],
      [
        {label: '농협은행', value: '011', img: nhNonghyup, type: 'bank'},
        {label: '우리은행', value: '020', img: woori, type: 'bank'},
      ],
      [
        {label: 'SC제일은행', value: '023', img: scFirst, type: 'bank'},
        {label: '한국씨티은행', value: '027', img: citi, type: 'bank'},
      ],
      [
        {label: '대구은행', value: '031', img: daegu, type: 'bank'},
        {label: '부산은행', value: '032', img: busan, type: 'bank'},
      ],
      [
        {label: '광주은행', value: '034', img: gwangju, type: 'bank'},
        {label: '제주은행', value: '035', img: jeju, type: 'bank'},
      ],
      [
        {label: '전북은행', value: '037', img: jeonbuk, type: 'bank'},
        {label: '경남은행', value: '039', img: gyeongnam, type: 'bank'},
      ],
      [
        {label: '새마을금고', value: '045', img: saemaeul, type: 'bank'},
        {label: '신협', value: '048', img: shinhyup, type: 'bank'},
      ],
      [
        {label: '상호저축은행', value: '050', img: savingsBank, type: 'bank'},
        {label: 'HSBC은행', value: '054', img: hsbc, type: 'bank'},
      ],
      [
        {label: '도이치은행', value: '055', img: deutscheBank, type: 'bank'},
        {
          label: '제이피모간체이스은행',
          value: '057',
          img: jp,
          type: 'bank',
        },
      ],
      [
        {label: 'BOA은행', value: '060', img: boa, type: 'bank'},
        {
          label: '비엔피파리바은행',
          value: '061',
          img: bnpParibas,
          type: 'bank',
        },
      ],
      [
        {label: '산림조합중앙회', value: '064', img: forestry, type: 'bank'},
        {label: '우체국', value: '071', img: postOffice, type: 'bank'},
      ],
      [
        {label: 'KEB하나은행', value: '081', img: hana, type: 'bank'},
        {label: '신한은행', value: '088', img: shinhan, type: 'bank'},
      ],
      [
        {label: '케이뱅크', value: '089', img: kebBank, type: 'bank'},
        {label: '카카오뱅크', value: '090', img: kakaoBank, type: 'bank'},
      ],
      [
        {label: '토스뱅크', value: '092', img: tossBank, type: 'bank'},
        {label: '', value: '', img: koreaInvestmentSecurities, type: 'bank'},
      ],
    ],
  },
  {
    title: '증권사',
    data: [
      [
        {
          label: '유안타증권',
          value: '209',
          img: yuantaSecurities,
          type: 'broker',
        },
        {label: 'KB증권', value: '218', img: kbSecurities, type: 'broker'},
      ],
      [
        {
          label: '미래에셋대우',
          value: '230',
          img: miraeAssetSecurities,
          type: 'broker',
        },
        {
          label: '삼성증권',
          value: '240',
          img: samsungSecurities,
          type: 'broker',
        },
      ],
      [
        {
          label: '한국투자증권',
          value: '243',
          img: koreaInvestmentSecurities,
          type: 'broker',
        },
        {
          label: 'NH투자증권',
          value: '247',
          img: nhInvestmentSecurities,
          type: 'broker',
        },
      ],
      [
        {label: '교보증권', value: '261', img: kyoboSecurities, type: 'broker'},
        {
          label: '하이투자증권',
          value: '262',
          img: hiInvestmentSecurities,
          type: 'broker',
        },
      ],
      [
        {
          label: '현대차증권',
          value: '263',
          img: hyundaiCarSecurities,
          type: 'broker',
        },
        {
          label: '키움증권',
          value: '264',
          img: kiwoomSecurities,
          type: 'broker',
        },
      ],
      [
        {
          label: '이베스트투자증권',
          value: '265',
          img: ebestInvestmentSecurities,
          type: 'broker',
        },
        {label: 'SK증권', value: '266', img: skSecurities, type: 'broker'},
      ],
      [
        {
          label: '대신증권',
          value: '267',
          img: daishinSecurities,
          type: 'broker',
        },
        {
          label: '한화투자증권',
          value: '269',
          img: hanwhaSecurities,
          type: 'broker',
        },
      ],
      [
        {
          label: '하나증권',
          value: '270',
          img: hanaDaetooSecurities,
          type: 'broker',
        },
        {label: '토스증권', value: '271', img: tossSecurities, type: 'broker'},
      ],
      [
        {
          label: '신한금융투자',
          value: '278	',
          img: shinhanFinancialInvestment,
          type: 'broker',
        },
        {
          label: 'DB금융투자',
          value: '279',
          img: dbFinancialInvestments,
          type: 'broker',
        },
      ],
      [
        {
          label: '유진투자증권',
          value: '280',
          img: yujinSecurities,
          type: 'broker',
        },
        {
          label: '메리츠증권',
          value: '287',
          img: meritzSecurities,
          type: 'broker',
        },
      ],
      [
        {label: '부국증권', value: '290', img: bugokSecurities, type: 'broker'},
        {
          label: '신영증권',
          value: '291',
          img: shinyoungInvestment,
          type: 'broker',
        },
      ],
      [
        {
          label: '케이프투자증권',
          value: '292',
          img: CapeInvestmentSecurities,
          type: 'broker',
        },
        {
          label: '',
          value: '',
          img: null,
          type: 'broker',
        },
      ],
    ],
  },
];

export const BankSlide = ({isVisible, setIsVisible, value, setValue}) => {
  const onPressBankItem = item => {
    setValue(item);
    setIsVisible(false);
  };

  const renderComponent = () => {
    return (
      <Sv h={500}>
        <St mb={16} s3 g1>
          은행 선택
        </St>
        <SectionList
          style={{flex: 1}}
          sections={items}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => {
            return (
              <Sv row>
                <BankButton
                  title={item[0].label}
                  value={item[0].value}
                  img={item[0].img}
                  onPress={() => onPressBankItem(item[0])}
                />
                {item[1].label !== '' && (
                  <BankButton
                    title={item[1].label}
                    value={item[1].value}
                    img={item[1].img}
                    onPress={() => onPressBankItem(item[1])}
                  />
                )}
              </Sv>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <St s3 mb={16}>
              {title}
            </St>
          )}
          numColumns={2}
        />
      </Sv>
    );
  };

  return (
    <ModalSlide
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      renderComponent={renderComponent}
      isPressable={false}
    />
  );
};
