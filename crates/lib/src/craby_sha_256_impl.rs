use sha2::{Digest, Sha256};

use crate::ffi::bridging::*;
use crate::generated::*;
use crate::types::*;

pub struct CrabySha256 {
    id: usize,
}

impl CrabySha256Spec for CrabySha256 {
    fn new(id: usize) -> Self {
        CrabySha256 { id }
    }

    fn id(&self) -> usize {
        self.id
    }

    fn digest(&mut self, data: &str) -> String {
        format!("{:x}", Sha256::digest(data.as_bytes()))
    }
}
