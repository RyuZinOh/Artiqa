use dotenv::dotenv;
use std::env;
use std::io::{self,Write};


mod api_client;
fn main(){
    dotenv().ok();

    let api_base = env::var("API_BASE_URL").expect("set the api base url plz in the .env");

    println!("Enter your jwt token: ");
    io::stdout().flush().expect("Failed to flush stdout");
    
    let mut token = String::new();
    io::stdin()
    .read_line(&mut token)
    .expect("failed to read the jwt token provided");

    let token = token.trim();
    let resp = api_client::caller(&api_base, token);

    println!("Success: {}", resp);

}