use reqwest::blocking::Client;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};



pub fn caller(apibase: &str, token:&str)-> String{
    let endpoint = format!("{}/artists/testartist", apibase);
    let mut headers = HeaderMap::new();

    headers.insert(
        AUTHORIZATION,
        HeaderValue::from_str(&format!("Bearer {}", token)).expect("invalid token formatting"),
    );
    let client = Client::new();
    let response = client.get(&endpoint).headers(headers).send().expect("Failed to send the request");

    if response.status().is_success(){
        response.text().expect("failed to read response")
    }else {
        panic!("request failed {}", response.status());
    }

}

