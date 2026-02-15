export const getBlogs = async () => {
  const res = await fetch("/api/blogs");
  return res.json();
};

export const deleteBlog = async (id: string) => {
  await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
};
