
const ErrorPage = () => {
  return (
    <div style={ {
      textAlign: "center",
      marginTop: "50px",
    }}>
      <h2 style={styles.title}>Oops! Something went wrong.</h2>
      <p style={styles.message}>Please try again later.</p>
    </div>
  );
};

const styles = {
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px"
  },
  message: {
    fontSize: "18px",
    color: "#666"
  }
};

export default ErrorPage;