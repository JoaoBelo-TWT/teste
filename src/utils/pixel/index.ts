/* eslint-disable max-len */
export const buildPixelUrl = (websiteId: string) =>
  `
<!-- Start Source Pixel Snippet -->
  <script>!function(e,s,t,n,c,i,o,r,u){e[c]||((o=e[c]=function(){o.process?o.process.apply(o,arguments):o.queue.push(arguments)}).queue=[],o.t=+new Date,(r=s.createElement(t)).async=1,r.src="${process.env.NEXT_PUBLIC_SOURCE_PIXEL_URL}/${websiteId}/sourcepixel.min.js?t="+864e5*Math.ceil(new Date/864e5),(u=s.getElementsByTagName(t)[0]).parentNode.insertBefore(r,u))}(window,document,"script",0,"sourcePixel"),sourcePixel("init","${websiteId}"),sourcePixel("event","pageload")</script>
<!-- End Source Pixel Snippet -->
`;
