# localdebt-scraper
지방 채무 비율 정보와 지방 공기업 부채 비율 정보를 재정고 사이트로부터 가져오는 소스코드입니다.

## 데이터 출처
해당 사이트로부터 데이터를 가져왔으나 복잡한 html 구조때문에 부득이하게 파이어폭스 브라우저를 통해 html을 그대로 복사해와 별도의 static html 파일을 만들어 긁어옵니다.

  - [년도별 예산 대비 채무 비율](http://lofin.mogaha.go.kr/lofin_stat/summary2/JaChi_Normal_Summary3.jsp?yyyy=2013&detlCd=A015&srchTypeHidden=1&sido1=00000&sido2=20&sido3=22) - [재정고](http://lofin.mogaha.go.kr)
  - [년도별 지방 공기업 부채 비율](http://lofin.mogaha.go.kr/lofin_stat/summary2/JaChi_Normal_Summary3.jsp?yyyy=2013&detlCd=A009&srchTypeHidden=1&sido1=00000&sido2=20&sido3=22) - [재정고](http://lofin.mogaha.go.kr)

## 활용 오픈소스
  - [express](http://expressjs.com)
  - [mongodb](http://mongodb.org), [mongodb - npm](https://www.npmjs.com/package/mongodb)
  - [node-scrape](https://www.npmjs.com/package/node-scrape)
  - [serve-static](https://www.npmjs.com/package/serve-static)

## 라이선스
[MIT LICENSE](LICENSE)