import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getExperiments } from '../utils/getExperiments';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700&text=${encodeURIComponent(text)}`;
  const css = await fetch(url).then((res) => res.text());
  const match = css.match(/url(https:\/\/[^)]+)/); // Match the font URL
  if (!match) throw new Error('Failed to load font URL');
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const experimentName = searchParams.get('experiment');

  const experiments = getExperiments();
  const experiment = experiments.find((exp) => exp.name === experimentName);

  const title = experiment ? experiment.name.replace(/-/g, ' ').toUpperCase() : 'BLACK LABS';
  const description = experiment
    ? `Explore the ${experiment.name.replace(/-/g, ' ')} experiment`
    : 'Experiments in design and technology';
  const creator = '@theteleporter';

  const fontData = await loadGoogleFont('Geist+Mono', `${title} ${description} ${creator}`);

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
          backgroundColor: '#161616',
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 16 }}>{creator}</div>
        <svg
          width="75"
          height="75"
          viewBox="0 0 75 75"
          fill="#fff"
          style={{ margin: '0 75px 3px' }}
        >
          <rect x="0" y="0" width="75" height="75" />
        </svg>
        <div style={{ marginTop: 40, fontSize: 48 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 24, maxWidth: '80%', textAlign: 'center' }}>
          {description}
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
    },
  );
}