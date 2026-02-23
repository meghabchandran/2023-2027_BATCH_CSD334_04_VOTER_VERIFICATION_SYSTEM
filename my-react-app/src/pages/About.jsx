function About() {
  return (
    <div className="min-h-screen bg-[#B9D6F2]/20 flex items-center justify-center p-8">

      <div className="
        max-w-3xl
        w-full
        bg-white
        rounded-2xl
        border border-[#006DAA]/30
        shadow-sm
        p-10
        hover:bg-[#eef4fb]
        hover:shadow-md
        transition-all duration-300
      ">

        {/* Section Header */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-[#0353A4] rounded-full mr-3"></div>
          <h2 className="text-3xl font-semibold text-[#061A40]">
            Smart Digital Voting System
          </h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm">
          The Smart Digital Voting System is built on the core principle of
          <strong> "One Vote • One Person"</strong>.
        </p>

        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          It ensures that each registered voter can cast their vote only once
          through secure digital authentication and real-time verification.
        </p>

        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          This platform enhances transparency, prevents duplicate voting,
          and maintains electoral integrity using modern technology.
        </p>

      </div>

    </div>
  );
}

export default About;