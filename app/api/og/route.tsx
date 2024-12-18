import { ImageResponse } from 'next/og';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@900&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('Failed to load font data');
}

function capitalizeFirstLetterOfEachWord(text: string) {
  return text.replace(/\b\w/g, char => char.toUpperCase()).replace(/-/g, ' ');
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const experiment = searchParams.get('experiment') || 'black-labs';
  const formattedExperiment = capitalizeFirstLetterOfEachWord(experiment);
  const currentDate = new Date().toISOString().split('T')[0];
  const defaultTitle = 'BLACK LABS';
  const handle = '@theteleporter_';

  const fontData = await loadGoogleFont('Geist+Mono', formattedExperiment);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          fontFamily: 'Geist',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: 20,
          }}
        >
          {handle}
        </div>
        <svg
          width="75"
          height="75"
          viewBox="0 0 75 75"
          fill="#fff"
          style={{ margin: '0 75px 3px' }}
        >
          <rect x="0" y="0" width="75" height="75" />
        </svg>
        <div style={{ marginTop: 40 }}>
          {formattedExperiment}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            fontSize: 24,
          }}
        >
          {defaultTitle}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            fontSize: 20,
          }}
        >
          {currentDate}
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}