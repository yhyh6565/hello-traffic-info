import { RadioPlayer } from "@/components/RadioPlayer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>안녕 교통정보 - 실시간 교통정보</title>
        <meta name="description" content="안녕 교통정보에서 실시간 교통정보와 청취자 사연을 들어보세요. 80년대 감성의 라디오 방송 경험을 제공합니다." />
      </Helmet>

      {/* Background: Table Texture/Dark Room */}
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center md:p-8 safe-area-inset overflow-hidden">

        {/* Radio Cabinet Wrapper - Portable Handheld Style */}
        <div className="w-full h-[100dvh] md:h-[calc(100vh-4rem)] md:max-h-[850px] md:w-full md:max-w-[420px] bg-wood-pattern md:rounded-[2.5rem] shadow-mobile md:shadow-2xl overflow-hidden relative border-[1px] border-white/10 md:border-8 md:border-[#2a1d15] flex flex-col">

          {/* Cabinet Bevel/Highlight (Desktop only) */}
          <div className="hidden md:block absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-50"></div>

          <RadioPlayer />
        </div>
      </div>
    </>
  );
};

export default Index;
