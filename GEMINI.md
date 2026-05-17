# heroStack 포트폴리오 웹사이트 프로젝트

이 파일은 Gemini CLI가 다음 세션에서도 기억하고 따라야 할 핵심 행동 지침 및 기획 내용입니다.

## 1. 프로젝트 개요
- **목적:** 5년 차 백엔드 개발자(김영웅 님)의 포트폴리오 웹사이트 구축
- **디자인 컨셉:** 모던 미니멀리즘 (Modern Minimal) - 화이트 톤, 부드러운 애니메이션, 높은 가독성
- **기술 스택:** React (Vite 기반) + TypeScript + Tailwind CSS + Framer Motion
- **저장소:** https://github.com/KimYoungUng74/heroStack.git

## 2. 작업 내역 및 다음 단계 (Phase 1)
- 사용자의 Notion 마크다운 경력기술서를 분석하여 단일 페이지(SPA) 구조의 기획을 완료했습니다.
- **다음 작업:** Vite 스캐폴딩을 이용해 React + TS + Tailwind CSS 초기 프로젝트 환경을 설정해야 합니다.

### [실행 가이드]
새로운 세션이 시작되면, 아래 명령어를 통해 프로젝트 초기화를 제안하고 실행하세요:
1. npm create vite@latest . -- --template react-ts (현재 폴더에 Vite 초기화)
2. npm install (의존성 설치)
3. Tailwind CSS 설치 및 설정
4. 이력서 데이터 바인딩을 위한 초기 구조 스캐폴딩

## 3. 페이지 구성 요약
- **Hero Section:** 인삿말, 프로필, 링크 아이콘 (Github, Blog 등)
- **About Me:** 거주지, 연락처, MBTI, 핵심 요약
- **Tech Stack:** 백엔드, DB, 기타 기술 뱃지 뷰
- **Experience & Projects:** 타임라인 형태의 프로젝트 이력 (홈앤쇼핑, 신세계, SK스토아 등)
- **Articles / Activity:** 기술 블로그 및 자격증/교육 이수

## 4. Git 관리 규칙 (중요)
- 모든 `git commit` 및 `git push` 작업은 수행 전 반드시 사용자의 명시적인 허락을 받아야 합니다.
- 자동 커밋/푸시를 지양하고, 변경 사항에 대해 요약 보고 후 승인 시에만 진행합니다.

*참고: 사용자에게 모든 작업은 순차적(Step-by-Step)으로 진행하며 확인을 받을 것.*
