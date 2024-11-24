import { ImageResponse } from 'next/og';
 
export async function GET() {
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
  }}
>
  <svg
    width="75"
    height="75"
    viewBox="0 0 75 75"
    fill="#fff"
    style={{ margin: '0 75px 3px' }}
  >
    <rect x="0" y="0" width="75" height="75" />
  </svg>
  <div style={{ marginTop: 40 }}>Black Labs</div>
</div>
    ),
    {
      width: 800,
      height: 400,
    },
  );
}