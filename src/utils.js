export const category = {
  '신상품': {
    text: '새로운 상품은 언제나 갖고 싶은걸',
  },
  '남자선물': {
    text: '남자들도 귀여운거 좋아해',
    sub: {
      '어른이': {
        text: '징그럽지만',
      },
    }
  },
  '여자선물': {
    text: '걸크러쉬 보여준당',
    sub: {
      '징그러': {
        title: '징그럽지만 기여어',
      },
    }
  },
  '괴짜물품': {
    text: '오타쿠가 되고 싶은 당신을 위한 물건들',
    sub: {
      '세미 오타쿠': {
        title: '인싸들의 세미 오타쿠물건들',
      },
    }
  },
}

export const blogCategory = ['특별한날', '기계 좋아함', '자칭 요리사', '욜로(인생 내일 없음)', '어린이들', '남친여친', '부모님', '창의적']

export const koreanWon = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 원'
}

export const trimUrl = (url) => url.split(' ').join('-');
export const unTrimUrl = (url) => url.split('-').join(' ');
