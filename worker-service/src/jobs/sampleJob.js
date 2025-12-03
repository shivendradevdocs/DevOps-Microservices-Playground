export default async function sampleJobProcessor(job) {
  console.log("Processing job:", job.data);

  // simulate long processing
  await new Promise((res) => setTimeout(res, 2000));

  return { status: "done", at: Date.now() };
}
