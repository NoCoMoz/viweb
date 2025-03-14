import TopSection from "@/components/TopSection/TopSection";
import BlueSkyFeed from "@/components/BlueSkyFeed/BlueSkyFeed";
import "@/styles/index.styles.scss";
import "@/styles/variables.scss";

interface Mission {
  _id: string;
  heading: string;
  content: string[];
}

// Use getStaticProps instead of getServerSideProps for static export
export async function getStaticProps() {
  try {
    // For static export, we'll use mock data
    const mockMissionData: Mission[] = [
      {
        _id: "1",
        heading: "Our Mission",
        content: [
          "Empowering voices through technology",
          "Building inclusive digital communities",
          "Fostering meaningful connections"
        ]
      }
    ];

    return {
      props: {
        missionData: mockMissionData,
      },
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        missionData: [],
      },
    };
  }
}

export default function Home({ missionData }: { missionData: Mission[] }) {
  return (
    <div className="page">
      <div className="body-home">
        <TopSection missionData={missionData} />
        <div className="bluesky-section">
          <div className="container">
            <BlueSkyFeed postLimit={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
