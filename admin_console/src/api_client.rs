use reqwest::blocking::Client;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};
use serde::Deserialize;

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
#[derive(Debug, Deserialize)]
pub  struct UserInfo{
    pub username : String,
    pub full_name : Option<String>,
   pub email: String 
}

#[derive(Debug, Deserialize)]
pub  struct UserDataResp{
    pub user: UserInfo,
}
//fetching user data
pub fn fetch_admin_information(apibase: &str, token:&str)->UserDataResp{
    let endpoint = format!("{}/users/get_data", apibase);
    let mut headers = HeaderMap::new();

    headers.insert(
        AUTHORIZATION,
        HeaderValue::from_str(&format!("Bearer {}", token)).expect("invalid token formatting"),
    );
    let client = Client::new();
    let response = client.get(&endpoint).headers(headers).send().expect("Failed to send the request");
  
    if response.status().is_success(){
        response.json::<UserDataResp>().expect("failed to read response")
    }else {
        panic!("request failed {}", response.status());
    }


}


