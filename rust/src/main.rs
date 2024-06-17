use axum::{extract::Json, routing::post, Router};
use std::net::SocketAddr;
use tokio::net::TcpListener;

async fn sum_numbers(Json(numbers): Json<Vec<f64>>) -> Json<f64> {
    let sum: f64 = numbers.iter().sum();
    Json(sum)
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/array-sum", post(sum_numbers));
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("SERVICE STARTED @ http://{}", addr);
    let listener = TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
