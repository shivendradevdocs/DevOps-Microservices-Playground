import { sampleQueue } from "./queue.js";

export async function addSampleJob(data) {
  await sampleQueue.add("myJob", data);
  console.log("Job added:", data);
}
