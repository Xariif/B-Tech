const TestPosts = [
  {
    id: 1,
    title: "Czarna dziura w procesorach intela",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.   ",
    authorId: "1",
    date: "2021-09-12",
    image: "https://picsum.photos/seed/asdws/1920/1080",
    tag: "tech",
  },
  {
    id: 2,
    title: "Przełom w budowach komputerów kwantowych",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.   ",
    authorId: "2",
    date: "2022-01-11",
    image: "https://picsum.photos/seed/qsdqw/1920/1080",
    tag: "SPACE",
  },
  {
    id: 3,
    title: "Jak ubić bosa w mario 64?",
    content:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.   ",
    authorId: "3",
    date: "2023-02-22",
    image: "https://picsum.photos/seed/qeseqr/1920/1080",
    tag: "MOTO",
  },
];

const GetAuthor = (id) => {
  return {
    name: "Jan Kowalski",
    id: "1",
    page: "jan-kowalski",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
  };
};

const TagColors = {
  TECH: "red",
  SPACE: "orange",
  MOTO: "blue",
  NATURE: "pink",
};

function Post({ PostData }) {
  return (
    <>
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            margin: "0 5rem",
            borderBottom: "1px solid grey",
            marginBottom: ".5rem",
            paddingBottom: ".5rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", fontSize: ".5rem" }}
          >
            <div
              style={{
                backgroundColor: TagColors[PostData.tag.toUpperCase()],
                height: ".3rem",
                width: "1.5rem ",
                marginRight: ".5rem",
              }}
            ></div>

            <div style={{ marginRight: "1rem", textTransform: "uppercase" }}>
              {PostData.tag}
            </div>
          </div>
          <a
            href={"post/" + PostData.id}
            style={{
              fontWeight: "bolder",
              fontSize: "2rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {PostData.title}
          </a>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: ".8rem",
            }}
          >
            <a
              style={{
                display: "flex",
                textDecoration: "none",
                color: "inherit",
              }}
              href={"author/" + GetAuthor(PostData.author).page}
            >
              <div style={{ fontWeight: "bold" }}>
                {GetAuthor(PostData.author).name}&nbsp;
              </div>
              {new Date(PostData.date).toLocaleDateString("pl-PL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </a>
            <p style={{ margin: "0", userSelect: "none" }}>
              Views: {Math.floor(Math.random() * 1000) + 1}
              &nbsp; Comments: {Math.floor(Math.random() * 100) + 1}
            </p>
          </div>
        </div>

        <a href={"post/" + PostData.id}>
          <img
            src={PostData.image}
            alt="zdjęcie"
            style={{
              borderRadius: "1.5rem",
              height: "480px",
              width: "100%",
              marginBottom: "1rem",
            }}
          />
        </a>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      {TestPosts.map((element) => {
        return <Post PostData={element} key={element.id} />;
      })}
    </>
  );
}
