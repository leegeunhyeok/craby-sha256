use sha2::{Digest, Sha256};

use crate::ffi::bridging::*;
use crate::generated::*;
use crate::context::*;
use crate::types::*;

pub struct CrabySha256 {
    ctx: Context,
}

impl CrabySha256Spec for CrabySha256 {
    fn new(ctx: Context) -> Self {
        CrabySha256 { ctx }
    }

    fn id(&self) -> usize {
        self.ctx.id
    }

    fn digest(&mut self, data: &str) -> String {
        format!("{:x}", Sha256::digest(data.as_bytes()))
    }
}
