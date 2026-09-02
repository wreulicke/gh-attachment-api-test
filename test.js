const fs = require('fs');

const uploadAPI = "https://uploads.github.com/user-attachments/assets"

const url = new URL(uploadAPI)
url.searchParams.append("name", "test.png")
url.searchParams.append("content_type", "image/png")
url.searchParams.append("repository_id", process.env.REPOSITORY_ID)

const fileStream = fs.createReadStream("test.png") // Replace with the actual file path

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    "Authorization": `token ${process.env.GH_TOKEN}`, // Replace with your GitHub token
    "Accept": "application/vnd.github+json"
  },
  body: fileStream, // Assuming fileStream is a readable stream of the file to upload
  duplex: 'half' // Required for streaming uploads
})
.then(async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} ${errorText}`);
  }
  return response.json();
})
.then(data => {
  console.log('Upload successful:', data);
})
.catch(error => {
  console.error('Error uploading file:', error);
});

/**
 * go implementation
	url, err := safeurl.JoinPathWithHostPrefix(ghinstance.UserAssetUploadPrefix(u.host), "user-attachments", "assets")
	if err != nil {
		return "", err
	}
	url.SetQuery("name", filepath.Base(a.path))
	url.SetQuery("content_type", a.contentType)
	url.SetQuery("repository_id", strconv.FormatInt(u.targetRepository, 10))

	open := func() (io.ReadCloser, error) { return openFile(a.path) }

	f, err := open()
	if err != nil {
		return "", err
	}
	defer f.Close()

	req, err := http.NewRequestWithContext(ctx, "POST", url.String(), f)
	if err != nil {
		return "", err
	}
	req.ContentLength = a.info.Size()
	req.Header.Set("Content-Type", "application/octet-stream")
	req.Header.Set("Accept", "application/vnd.github+json")
	// Without GetBody a redirect re-reads an exhausted reader.
	req.GetBody = open

	resp, err := u.httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return "", api.HandleHTTPError(resp)
	}

	var asset struct {
		URL string `json:"url"`
	}
 */