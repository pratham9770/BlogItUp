export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About BlogItUp
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            With BlogItUp, writing and publishing blog posts is a breeze. Its user-friendly interface and intuitive tools make it easy for users to craft engaging content without any hassle.
            </p>
            <p>
            Utilizing JWT token authentication, BlogItUp ensures the security of user accounts, protecting personal information and providing peace of mind for both bloggers and readers.
            </p>
            <p>
            Manage your blog effortlessly with BlogItUp's streamlined features. From editing posts to moderating comments, users have full control over their blog's content and interaction with their audience.
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}