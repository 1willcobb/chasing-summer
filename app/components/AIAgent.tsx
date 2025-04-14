export default function AIAgent() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center w-full">
        <div className="max-w-md w-full flex flex-col items-center">
          <h1 className="mb-5 text-5xl font-bold">WRITE HERE</h1>
          <textarea
            className="mb-5 bg-base-300 h-24 outline-primary rounded-lg p-2 resize-none w-full"
            placeholder=" Provident cupiditate voluptatem et in. "
          ></textarea>
          <button
            className="btn btn-primary px-8"
            onClick={() => console.log("get started pressed")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
