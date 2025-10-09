import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const version = searchParams.get('v')
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
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            opacity: 0.1,
            top: '50px',
            left: '50px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            opacity: 0.1,
            bottom: '50px',
            right: '50px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            opacity: 0.1,
            top: '150px',
            right: '200px',
          }}
        />
        
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1000px',
            padding: '40px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '30px',
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            A
          </div>
          
          {/* Title */}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              margin: '0 0 10px 0',
              background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            AI+DI
          </h1>
          
          {/* Subtitle */}
          <p
            style={{
              fontSize: '24px',
              color: '#22d3ee',
              margin: '0 0 30px 0',
            }}
          >
            AI that reflects. Not replaces.
          </p>
          
          {/* Description */}
          <p
            style={{
              fontSize: '18px',
              color: '#94a3b8',
              lineHeight: 1.6,
              margin: '0 0 20px 0',
              maxWidth: '800px',
            }}
          >
            Building AI that reflects human consciousness and enhances our potential for conscious living in the digital age.
          </p>
          
          {/* URL */}
          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              margin: 0,
            }}
          >
            www.aidi.world
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 