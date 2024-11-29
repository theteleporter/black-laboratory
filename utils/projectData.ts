export type Project = {
  name: string;
  url: string;
  type: 'internal' | 'external';
  forkedFrom?: string;
  category?: 'design' | 'engineering' | 'inspiration' | 'tools' | 'references';
};

export const experiments: Project[] = [
    { name: "ROBOT HEAD", url: "/experiments/robot-head", type: "internal" },
    { name: "BROWSER CODE BLOCK", url: "/experiments/browser-code-block", type: "internal" },
    { name: "LETTER GRAVEYARD", url: "/experiments/letter-graveyard", type: "internal", forkedFrom: "rauchg" },
    { name: "LOGO GENERATOR", url: "/experiments/logo-experiments", type: "internal", forkedFrom: "rauchg" },
    { name: "COMMAND CARD", url: "/experiments/command-card", type: "internal", forkedFrom: "rauchg" },
    { name: "DYNAMIC AVATAR", url: "/experiments/dynamic-avatar", type: "internal" },
    { name: "AVATAR MICRO SERVICE", url: "/experiments/avatar-micro-service", type: "internal" },
    { name: "WORD ART", url: "/experiments/word-art", type: "internal", forkedFrom: "rauchg" },
    { name: "FILE TREE", url: "/experiments/file-tree", type: "internal" },
    { name: "TELEBALL", url: "https://ball.theteleporter.me", type: "external" },
    { name: "CREPT STUDIO", url: "https://crept.studio", type: "external" },
    { name: "STRALUR", url: "https://ship.theteleporter.me/aff", type: "external" },
];

export const resources: Project[] = [
 { name: "CMDK", url: "https://cmdk.paco.me", type: "external", category: "design" },
 { name: "CRAFT - RAUNO", url: "https://rauno.me/craft", type: "external", category: "design" },
 { name: "BASEMENT STUDIO", url: "https://basement.studio", type: "external", category: "design" },
 { name: "ORIGIN UI", url: "https://originui.com", type: "external", category: "design" },
 { name: "GEIST - VERCEL", url: "https://vercel.com/geist", type: "external", category: "design" },
 { name: "PLAYBOOK - EBAY", url: "https://playbook.ebay.com/design-system/components", type: "external", category: "design" },
 { name: "FAB MENU", url: "https://path-button.v0.build", type: "external", category: "design" },
 { name: "VAUL", url: "https://vaul.emilkowal.ski", type: "external", category: "design" },
 { name: "SONNER", url: "https://sonner.emilkowal.ski", type: "external", category: "design" },
 { name: "SCROLLYTELLING", url: "https://scrollytelling.basement.studio", type: "external", category: "design" },
 { name: "PQOQUBBW", url: "https://icons.pqoqubbw.dev", type: "external", category: "design" },
 { name: "SHIFTNUDGE - MDS", url: "https://shiftnudge.com", type: "external", category: "design" },
 { name: "UIWTF - RAUNO", url: "https://uiw.tf", type: "external", category: "design" },
 { name: "IMPOSSIBLE CHECKBOX", url: "https://codepen.io/jordangoldworlDboss/pen/OJKopwJ", type: "external", category: "design" },
 { name: "UI PLAYBOOK - RAUNO", url: "https://uiplaybook.dev", type: "external", category: "design" },
 { name: "FLOW - RAUNO", url: "https://flow.rest", type: "external", category: "design" },
 { name: "DEVOURING DETAILS", url: "https://devouringdetails.com", type: "external", category: "design" },
 { name: "NUMBER FLOW", url: "https://number-flow.barvian.me", type: "external", category: "design" },
 { name: "PRODUCT HOVERS - JHEY", url: "https://codepen.io/jh3y/pen/bNbGZVq", type: "external", category: "design" },
 { name: "DEPARTURE MONO", url: "https://departuremono.com", type: "external", category: "design" },
 { name: "PHOSPHOR ICONS", url: "https://phosphoricons.com", type: "external", category: "design" },
 { name: "HEADLESS MOTION", url: "https://www.raphaelsalaja.com/projects/headless-motion", type: "external", category: "design" },
 { name: "SPATIAL ARE.NA", url: "https://www.raphaelsalaja.com/projects/spatial.are.na", type: "external", category: "design" },
 { name: "RAYCAST", url: "https://www.raycast.com", type: "external", category: "design" },
 { name: "LINEAR", url: "https://linear.app", type: "external", category: "design" },
 { name: "USER VALIDATION - JHEY", url: "https://codepen.io/jh3y/pen/gbYbmNB", type: "external", category: "design" },
 { name: "TOLDO", url: "https://toldo.vercel.app", type: "external", category: "design" },
 { name: "INSPX", url: "https://inspx.rauno.xyz", type: "external", category: "design" },
 { name: "REACT SMOOTH RANGE INPUT", url: "https://react-smooth-range-input.vercel.app", type: "external", category: "design" },
 { name: "SWC", url: "https://swc.rs", type: "external", category: "engineering" },
 { name: "GLTF - REACT THREE FIBER", url: "https://gltf.pmnd.rs", type: "external", category: "engineering" },
 { name: "COBE - SHU DING", url: "https://cobe.vercel.app", type: "external", category: "engineering" },
 { name: "CHROMA", url: "https://www.trychroma.com", type: "external", category: "engineering" },
 { name: "RETRIEVAL POWERED BY OBJECT STORAGE", url: "https://www.trychroma.com/engineering/serverless", type: "external", category: "engineering" },
 { name: "NEW ON THE WEB PLATFORM", url: "https://www.industrialempathy.com/new-on-the-web", type: "external", category: "engineering" },
 { name: "SERVERLESS SERVERS", url: "https://vercel.com/blog/serverless-servers-node-js-with-in-function-concurrency", type: "external", category: "engineering" },
 { name: "VERSION SKEW", url: "https://www.industrialempathy.com/posts/version-skew", type: "external", category: "engineering" },
 { name: "DESIGNING EVEN LARGER APPLICATIONS", url: "https://www.industrialempathy.com/posts/designing-even-larger-applications", type: "external", category: "engineering" },
 { name: "CRAFT - RAUNO", url: "https://rauno.me/craft", type: "external", category: "inspiration" },
 { name: "EMIL KOWALSKI", url: "https://emilkowal.ski/", type: "external", category: "inspiration" },
 { name: "MDS", url: "https://mds.is", type: "external", category: "inspiration" },
 { name: "DELBA OLIVIERA", url: "https://delba.dev", type: "external", category: "inspiration" },
 { name: "SHU DING", url: "https://shud.in", type: "external", category: "inspiration" },
 { name: "MALTE UBL", url: "https://industrialempathy.com", type: "external", category: "inspiration" },
 { name: "LANCE", url: "https://lancedraws.com", type: "external", category: "inspiration" },
 { name: "V0", url: "https://v0.dev", type: "external", category: "tools" },
 { name: "WEBVM", url: "https://webvm.io", type: "external", category: "tools" },
 { name: "POSTGRES SANDBOX", url: "https://database.build", type: "external", category: "tools" },
 { name: "GEIST GAUGE", url: "https://geist-gauge.vercel.app", type: "external", category: "tools" },
 { name: "AI SDK - VERCEL", url: "https://sdk.vercel.ai", type: "external", category: "tools" },
 { name: "SKETCHFAB", url: "https://sketchfab.com", type: "external", category: "tools" },
 { name: "VECTICON", url: "https://www.vecticon.co/tools/image-vectorizer", type: "external", category: "tools" },
 { name: "REACT SCAN", url: "https://react-scan.million.dev", type: "external", category: "tools" },
 { name: "TAURI", url: "https://tauri.app", type: "external", category: "tools" },
 { name: "CLOUDINARY", url: "https://cloudinary.com", type: "external", category: "tools" },
 { name: "FFMPEG ONLINE", url: "https://ffmpeg.wide.video", type: "external", category: "tools" },
 { name: "FFMPEG", url: "https://www.ffmpeg.org", type: "external", category: "tools" },
  { name: "TEMPLATES - VERCEL", url: "https://vercel.com/templates", type: "external", category: "tools" },
  { name: "SUPABASE", url: "https://supabase.com", type: "external", category: "tools" },
  { name: "LIVEBLOCKS", url: "https://liveblocks.io", type: "external", category: "references" },
  { name: "NEXT FILTER LIST", url: "https://next15-filterlist.vercel.app/done", type: "external", category: "references" },
  { name: "CSS TRICKS", url: "https://css-tricks.com", type: "external", category: "references" },
  { name: "SVG'S / SPRITES", url: "https://benadam.me/thoughts/react-svg-sprites", type: "external", category: "references" },
  { name: "RUSTFINITY", url: "https://www.rustfinity.com", type: "external", category: "references" },
  { name: "THE MAGIC OF CLIP PATH", url: "https://emilkowal.ski/ui/the-magic-of-clip-path", type: "external", category: "references" },
  { name: "CRAFTING THE NEXT.JS WEBSITE", url: "https://rauno.me/craft/nextjs", type: "external", category: "references" },
  { name: "PERSONAL COMPUTER - SKETCHFAB", url: "https://sketchfab.com/3d-models/personal-computer-b943e06de72c4b2b9ac6b9d7ca813f8f", type: "external", category: "references" },
  { name: "WEB INTERFACE GUIDELINES - RAUNO", url: "https://interfaces.rauno.me", type: "external", category: "references" },
  { name: "PARK UI", url: "https://park-ui.com", type: "external", category: "references" },
  { name: "DESIGN SPELLS", url: "https://www.designspells.com", type: "external", category: "references" },
  { name: "CREATING DIALOGS", url: "https://www.raphaelsalaja.com/playground/creating-dialogs", type: "external", category: "references" },
  { name: "DELAYED BUTTON", url: "https://www.raphaelsalaja.com/playground/delayed-button", type: "external", category: "references" },
  { name: "SHARED ANIMATIONS", url: "https://www.raphaelsalaja.com/playground/shared-animations", type: "external", category: "references" },
  { name: "WHIM", url: "https://www.raphaelsalaja.com/projects/whim", type: "external", category: "references" },
  { name: "COLOR MAGIC", url: "https://colormagic.app", type: "external", category: "references" },
  { name: "INVISIBLE DETAILS OF INTERACTION DESIGN", url: "https://rauno.me/craft/interaction-design", type: "external", category: "references" },
  { name: "IMAGE COMPONENT WITH NEXT.JS", url: "https://image-component.nextjs.gallery", type: "external", category: "references" },
];
