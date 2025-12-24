import { RadioPlayer } from "@/components/RadioPlayer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>안녕 교통정보 - 실시간 교통정보</title>
        <meta name="description" content="안녕 교통정보에서 실시간 교통정보와 청취자 사연을 들어보세요. 80년대 감성의 라디오 방송 경험을 제공합니다." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center p-4 safe-area-inset">
        {/* Mobile device frame wrapper */}
        <div className="w-full max-w-[400px] h-[calc(100vh-2rem)] max-h-[800px] bg-card rounded-3xl shadow-mobile overflow-hidden">
          <RadioPlayer />
        </div>
      </div>
    </>
  );
};

export default Index;
