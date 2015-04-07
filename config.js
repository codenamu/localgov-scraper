var config = module.exports = {};

config.provincesCode = {
  "서울": 11,
  "부산": 21,
  "대구": 22,
  "인천": 23,
  "광주": 24,
  "대전": 25,
  "울산": 26,
  "세종": 29,
  "경기": 31,
  "강원": 32,
  "충북": 33,
  "충남": 34,
  "전북": 35,
  "전남": 36,
  "경북": 37,
  "경남": 38,
  "제주": 39
};

config.cities = ['전국', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

config.debtRatio_old = {
  collections: [{
    name: 'debtratio',
    group: 'body > table > tbody > tr > td > table > tbody > tr',
    elements: {
      name: {
        query: '> td:first-child',
        filter: function (data) {
          // Filtering unnecessary strings
          var filterStr = config.cities.concat(['지역', '제주도', '강원도', '경기도', '지역별합계', '전국계']);
          
          if (filterStr.indexOf(data) > -1) {
            return null;
          } else if (data == '제주도본청') {
            return '제주본청'
          } else if (data == '경기도본청') {
            return '경기본청'
          }
          
          return data;
        }
      },
      remain: {
        query: '> td:nth-child(2)',
        format: 'number'
      },
      budget: {
        query: '> td:nth-child(3)',
        format: 'number'
      },
      ratio: {
        query: '> td:last-child'
      }
    }
  }]
};

config.debtRatio = {
  collections: [{
    name: 'debtratio',
    group: 'body > table > tbody > tr',
    elements: {
      name: {
        query: '> td:first-child',
        filter: function (data) {
          // Filtering unnecessary strings
          var filterStr = config.cities.concat(['채무잔액(A)', '시도별현황', '자치단체', '자치단체별 현황', '전국현황']);

          if (filterStr.indexOf(data) > -1 || data.length > 7) {
            return null;
          } 

          return data;
        }
      },
      remain: {
        query: '> td:nth-child(2)',
        format: 'number'
      },
      budget: {
        query: '> td:nth-child(3)',
        format: 'number'
      },
      ratio: {
        query: '> td:last-child'
      }
    }
  }]
};

config.enterprise = {
  collections: [{
    name: 'enterprise',
    group: 'body > table > tbody > tr',
    elements: {
      name: {
        query: '> td:first-child',
        filter: function (data) {
          // Filtering unnecessary strings
          var filterStr = config.cities.concat(['시도별현황', '자치단체', '자치단체별 현황', '전국현황']);

          if (filterStr.indexOf(data) > -1 || data.length > 7) {
            return null;
          } 

          return data;
        }
      },
      remain: {
        query: '> td:nth-child(2)',
        format: 'number'
      },
      budget: {
        query: '> td:nth-child(3)',
        format: 'number'
      },
      ratio: {
        query: '> td:last-child'
      }
    }
  }]
};