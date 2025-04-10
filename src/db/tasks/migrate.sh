#!/bin/bash

# Sincroniza la migración con la db
deno -A --node-modules-dir npm:drizzle-kit migrate
