const API_URL = "http://localhost:5000/api/generate";

async function generateStudyMaterial(input, signal) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input,
    }),
    signal,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to generate study material."
    );
  }

  return data;
}

export default generateStudyMaterial;