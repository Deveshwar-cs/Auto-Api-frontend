const CodeSection = () => {
  return (
    <section className="bg-slate-950 text-white px-8 py-20 grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-3xl font-bold">Professional Code</h2>
        <p className="mt-4 text-gray-400">
          Clean, production ready Express & MongoDB backend.
        </p>
      </div>

      <div className="bg-black p-6 rounded-xl">
        <pre className="text-green-400 text-sm">
          {`router.get("/", async (req,res)=>{
 const users = await User.find();
 res.json(users);
});`}
        </pre>
      </div>
    </section>
  );
};

export default CodeSection;
