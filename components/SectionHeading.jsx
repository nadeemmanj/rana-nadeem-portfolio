// Centered section heading: small eyebrow label + big H2.
// `title` accepts a React node, so callers can mix in gradient text:
//   <SectionHeading eyebrow="MY WORK" title={<>My <span className="text-gradient">Projects</span></>} />
export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <p className="text-blue-400 text-sm font-semibold tracking-[0.3em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#e8eefc]">{title}</h2>
    </div>
  );
}
