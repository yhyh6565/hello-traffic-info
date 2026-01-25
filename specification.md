# 프로젝트 명세서: 안녕 교통정보 (Hello Traffic Info)

## 1. 프로젝트 개요
**안녕 교통정보**는 1980~90년대 레트로 라디오 방송을 모방한 몰입형 웹 기반 오디오 플레이어입니다. 이 애플리케이션은 평범한 교통 정보 채널처럼 보이지만, "아날로그 호러(Analog Horror)" 스토리텔링을 전달하는 매체 역할을 합니다. 청취자는 일상적인 교통 업데이트와 기이하고 초자연적인 사연이 섞인 방송을 경험하며, 시각적 글리치와 오디오 왜곡 효과가 더해져 공포감을 조성합니다.

## 2. 기술 스택
-   **프론트엔드 프레임워크**: React 18 (Vite 사용)
-   **언어**: TypeScript
-   **스타일링**: Tailwind CSS, Shadcn/UI (Radix Primitives)
-   **애니메이션**: CSS Keyframes (글리치, 스캔라인, CRT 효과), Tailwind Animate
-   **상태 관리**: React Custom Hooks (`useRadioPlayer`, `useGlitchEffect`)
-   **오디오 엔진**: Native HTML5 Audio API
-   **아이콘**: Lucide React
-   **폰트**: `@fontsource/noto-sans-kr`, `@fontsource/playfair-display`, `@fontsource/gowun-batang`

## 3. 디자인 시스템: "레트로 라디오"
UI는 물리적인 휴대용 라디오(금성 198X-KR 모델 컨셉)를 시뮬레이션하는 스큐어모피즘(Skeuomorphism) 디자인 언어를 따릅니다.

### 색상 팔레트
-   **캐비닛 (Cabinet)**: `hsl(27, 30%, 22%)` (짙은 호두나무 질감)
-   **전면 패널 (Faceplate)**: `hsl(42, 60%, 85%)` (오래된 크림색 플라스틱/금속)
-   **스피커 그릴 (Speaker Grille)**: `hsl(25, 17%, 14%)` (어두운 패브릭 메쉬)
-   **강조색 (Accents)**: `hsl(43, 46%, 56%)` (황동/골드), `hsl(24, 100%, 44%)` (따뜻한 주황색 표시등)

### 레이아웃 및 반응형
-   **컨셉**: 책상 위에 놓인 휴대용 라디오.
-   **모바일**: 화면을 꽉 채우는 몰입형 경험 제공.
-   **데스크탑**: 화면 중앙에 위치한 "휴대용 기기" 레이아웃. 고정된 최대 너비(~420px)를 유지하여 휴대용 느낌을 살리며, 배경은 어두운 앰비언트 톤으로 처리.

### 시각 효과
-   **CRT/VHS**: 스캔라인, 노이즈, 정적 오버레이 효과.
-   **글리치 (Glitch)**: "공포(Creepy)" 콘텐츠 구간에서 텍스트 및 UI 왜곡 발생.
-   **스큐어모피즘**: 입체감 있는 3D 버튼 (`.btn-retro`), 내부 그림자 (`.panel-inset`), 나무 및 그릴 텍스처 적용.

## 4. 데이터 구조

### 대본 모델 (`src/types/script.ts`)
핵심 콘텐츠는 "Script(대본)"의 재생목록으로 구동됩니다.

```typescript
export interface Script {
  id: string;          // 고유 식별자
  type: "story" | "traffic"; // 콘텐츠 카테고리 (사연 또는 교통정보)
  isCreepy: boolean;   // true일 경우 글리치 효과 트리거
  title: string;       // 표시 제목
  text: string;        // 전체 대본 텍스트
  dialogue?: Array<{   // 가사 뷰를 위한 구조화된 대화
    speaker: "DJ" | "Listener";
    text: string 
  }>;
  audioUrl: string;    // 오디오 파일 경로 (로컬 또는 원격)
}
```

## 5. 핵심 기능

### 오디오 플레이어 (`useRadioPlayer`)
-   **재생 로직**: "교통정보"와 "사연"을 번갈아 가며 무한히 재생하는 믹스 자동 생성.
-   **상태 머신**: 재생 중(Playing), 로딩 중(Loading), 에러(Error) 상태 관리.
-   **볼륨 제어**: 전역 볼륨 상태 관리 (세션 유지 가능).

### 글리치 엔진 (`useGlitchEffect`)
-   **트리거**: 현재 재생 중인 스크립트의 `isCreepy` 속성이 `true`일 때 활성화.
-   **효과**:
    -   표시되는 제목 텍스트를 무작위으로 왜곡.
    -   RGB 분리 애니메이션이 포함된 CSS 클래스(`glitch-text`) 적용.
    -   오디오 왜곡 트리거 확장 가능 (추후 기능).

### 컴포넌트
-   **`RadioPlayer.tsx`**: 메인 컨테이너. UI를 "스피커 그릴(상단)"과 "전면 제어 패널(하단)"로 분리.
-   **`VisualizerArea`**: 아날로그 디스플레이를 모방한 오디오 시각화(파형/스펙트럼) 렌더링.
-   **`ProgressBar`**: 아날로그 튜너 바늘 또는 진행 바 형태.
-   **`LyricsOverlay`**: 텔레프롬프터나 자막 로그처럼 대본/대화를 오버레이로 표시.

## 6. 디렉토리 구조
```
src/
├── components/         # UI 컴포넌트 (헤더, 플레이어, 시각화 도구)
│   └── ui/             # 재사용 가능한 최소 단위 컴포넌트 (버튼, 슬라이더 - Shadcn)
├── hooks/              # 비즈니스 로직 (플레이어, 글리치, 테마)
├── data/               # 정적 데이터 (scripts.json)
├── types/              # TS 인터페이스 정의
├── pages/              # 라우트 페이지 (Index, NotFound)
└── index.css           # 전역 스타일 및 Tailwind 레이어 설정
```
