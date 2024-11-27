# What is this?
This stuff can build [Collatz graph](https://en.wikipedia.org/wiki/Collatz_conjecture#In_reverse) and render it with [graphviz](https://graphviz.org/)

We exclude even numbers (as they are just odds time some powers of 2 ) and also mark primes we found on our way.

# How to run

By default ``npm start`` will print out graph in graphviz format that leads up to 127 (single target)

In case you want to customize, run npm i and then put some stuff to your ``.env`` file:
* ``SEARCH`` - target number to search for
* ``ALL`` - search for all numbers up to target or just make sure we found direct path to it
* ``LIM`` - heuristics not to grow our tree too fast (by default we assume ``500 * SEARCH`` is enough)

## To render stuff

Make sure you have graphviz installed (e.g. ``brew install graphviz``)

Then run ``npm run render`` and you will (hopefully, see limitations below) have ``output.png`` in your cwd (using default dot engine).

Of course, you can follow graphviz docs to adjust layout engine or play with some other stuff yourself (using ``dot`` [cli](https://graphviz.org/doc/info/command.html)).

## Limitations
This thing is rather naive and straightforward in terms of implementation, and therefore lacks any smart optimizations.
Obviously, with this approach when we search in all directions, tree gets huge pretty quick.

On M1 Mac with 8Gb RAM it was able to build full graph up to 8191 in somewhat reasonable 73s (only 17.5s to find path to single target), but failed to find path to next Mersenne number 131071 due to OOM.
