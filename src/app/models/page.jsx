const ModelsPage = async () => {
  const res = await fetch("http://localhost:8000/models", {
    // cache: "force-cache", //SSG: Default--> cached everything in first render.
    cache: "no-store", //SSR: Dynamic--> no store anything in cache, update instant data changed
    // next: {revalidate:10} //ISR: Revalidate --> update will every 10s interval
  });
  const models = await res.json();
  console.log(models);

  return (
    <div className="grid grid-cols-4 gap-3">
      {models.map((model) => (
        <div
          key={model.id}
          className="space-y-3 border-2 border-gray-300 rounded-lg p-3"
        >
          <h2 className="font-bold text-2xl">{model.title}</h2>
          <p>{model.description}</p>
          <p className="text-green-500 font-bold">Price: {model.price} $</p>
        </div>
      ))}
    </div>
  );
};

export default ModelsPage;
