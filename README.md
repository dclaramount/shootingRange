# Strelniceprerov

This is the general readme file for the repository of the strelnice-prerov project. 

https://strelniceprerov.cz/

The repo has two main folders:
 
./shootingRange/react-workspace/strelniceprerov : which is the one where the actual plugin that is imported to Elementor resides.

./shootingRange/react-workspace/typescript/shooting-range : where a basic react project is set up to run the plugins locally.

## NX PLUGIN GENERATOR
``
NX_RELEASE_VERSION=XXXX npx nx pkg shooting-range
``

The above command will build the folder and in the path:

./shootingRange/react-workspace/strelniceprerov/dist/elementor/shooting-range/*

> [!NOTE]
> This folder will later be ziped and imported into our wordpress site.