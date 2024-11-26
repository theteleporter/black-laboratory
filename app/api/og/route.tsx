import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getExperiments } from '@/utils/getExperiments'; // Adjust path as needed

// Function to load fonts
async function loadGoogleFont(font: string, text: string) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700&text=${encodeURIComponent(text)}`;
    const css = await fetch(url).then((res) => res.text());
    const match = css.match(/url(https:\/\/[^)]+\.ttf)/);

    if (!match) throw new Error('Font URL not found in CSS');
    const fontUrl = match[1];
    return fetch(fontUrl).then((res) => res.arrayBuffer());
  } catch (error) {
    console.error('Failed to load font:', error);
    throw new Error('Font loading failed');
  }
}

export async function GET(req: NextRequest) {
  try {
    // Fetch the experiment name from query params
    const searchParams = req.nextUrl.searchParams;
    const experiment = searchParams.get('experiment');

    // Dynamically fetch experiments for validation if needed
    const experiments = await getExperiments();
    const isValidExperiment = experiment && experiments.includes(experiment);

    // Set dynamic title and description
    const title = isValidExperiment
      ? experiment.replace(/-/g, ' ').toUpperCase()
      : 'BLACK LABS';
    const description = isValidExperiment
      ? `Explore the ${experiment.replace(/-/g, ' ')} experiment`
      : 'Experiments in design and technology';
    const creator = '@theteleporter';

    // Load font
    const fontData = await loadGoogleFont('Geist+Mono', `${title} ${description} ${creator}`);

    // Define shared styles
    const containerStyle = {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#161616',
      color: '#fff',
    };

    const headerStyle = { position: 'absolute', top: 20, right: 20, fontSize: 16 };
    const titleStyle = { marginTop: 40, fontSize: 48 };
    const descriptionStyle = { marginTop: 20, fontSize: 24, maxWidth: '80%', textAlign: 'center' };

    // Return OG image response
    return new ImageResponse(
      (
        <div style={containerStyle}>
          <div style={headerStyle}>{creator}</div>
          <svg
            width="75"
            height="75"
            viewBox="0 0 75 75"
            fill="#fff"
            style={{ margin: '0 75px 3px' }}
          >
            <rect x="0" y="0" width="75" height="75" />
          </svg>
          <div style={titleStyle}>{title}</div>
          <div style={descriptionStyle}>{description}</div>
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
  } catch (error) {
    console.error('Failed to generate OG image:', error);

    // Handle fallback image in case of an error
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#161616',
            color: '#fff',
            fontSize: 32,
          }}
        >
          OG Image Generation Failed
        </div>
      ),
      {
        width: 800,
        height: 400,
      }
    );
  }
}