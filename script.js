const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository-card";

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    title.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const metadata = document.createElement("div");
    metadata.className = "repository-meta";

    const language = document.createElement("span");
    language.textContent = `Language: ${repository.language}`;

    const starredDate = document.createElement("time");
    starredDate.dateTime = repository.starredAt;
    starredDate.textContent = `Starred ${repository.starredAt}`;

    metadata.append(language, starredDate);
    item.append(title, description, metadata);
    repositoryList.append(item);
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a JSON array");
    }

    renderRepositories(repositories);
    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    statusMessage.dataset.error = "true";
    statusMessage.textContent =
      "Could not load starred repositories. Please try again later.";
  }
}

loadRepositories();
