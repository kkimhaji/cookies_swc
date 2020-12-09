# 

## node 환경
- npx v10.2.2
-  npm v6.14.5
- node v12.16.3

## 서버 실행
- npm run dev

### Git 명령어

- 커밋하기
	- git add .
	- git commit -m "커밋 내용"
- push하기
	- git push cookies_swc master
- pull하기
	- git pull cookies_swc master
- fetch하기
	- git fetch cookies_swc master
- merge하기
	- git merge cookies_swc master
- 상태 확인
	- git status

## MongoDB 계정 생성

### 1. MongoDB 실행
- $ sudo mongod
### 2. MongoDB SHELL
- $ sudo mongo
- >> use admin
- >> db.createUser({user:'root',pwd:'root',roles:['root']})
- >> exit
- MongoDB 끄기
### 3. MongoDB 실행
- $ sudo mongod -auth (항상 -auth 옵션으로 실행)
