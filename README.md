# What is this?
This stuff can build [Collatz graph](https://en.wikipedia.org/wiki/Collatz_conjecture#In_reverse) and render it with [graphviz](https://graphviz.org/)

We exclude even numbers (as they are just odds time some powers of 2 ) and also mark primes we found on our way.

Initial motivation was to write some algorithm to generate graph from the bottom (just for lulz) instead of doing 3n+1 (which is of course much faster).

Currently we have both modes: ``TRACE`` and ``SEARCH`` as switches

# How to run

By default ``npm start`` will print out graph in graphviz format that we generated in order to find 7 (in ``SEARCH`` mode)

In case you want to customize, run npm i and then put some stuff to your ``.env`` file:
* ``TRACE`` - secret parameter to use 3n+1 sequence for target (kinda source in this case) instead of searching for it
* ``SEARCH`` - target number to search for
* ``ALL`` - search for all numbers up to target or just make sure we found direct path to it
* ``LIM`` - max value to be added to graph (kinda heuristics not to grow our tree too fast; by default we assume ``500 * SEARCH`` is enough)
* ``SKIP`` - determines if we render all nodes we have in graph or only those that lead to our targets

## Kinda modes based on these switches
For now this is what comes to mind regarding the logic this stuff has

#### 0 - Trace some big stuff to see the path (fast)
This can be used when our tree was so big we got OOM. Use ``TRACE`` (which has precedence over ``SEARCH``) and set ``ALL=``

``LIM`` is also supported here though.

#### 1 - Render the tree with all stuff up to SEARCH (or TRACE)
In this case we set ``ALL=true``, ``SKIP=true`` and hope that our ``LIM`` heuristics still lets us build the tree (and adjust it when fails).

#### 2 - Check if we can get to target with a given restriction
In this case we set ``ALL=`` (only empty string is false'y),  ``SKIP=true`` and play with ``LIM``

#### 3 - What else do we have in our tree by the time we hit target (default stuff)
Here we set ``ALL=`` to false, ``SKIP=`` as well, and see how ``LIM`` affects size of our tree

## To render stuff

Make sure you have graphviz installed (e.g. ``brew install graphviz``)

Then run ``npm run render`` and you will (hopefully, see limitations below) have ``output.png`` in your cwd (using default dot engine).

Of course, you can follow graphviz docs to adjust layout engine or play with some other stuff yourself (using ``dot`` [cli](https://graphviz.org/doc/info/command.html)).

## Limitations
This thing is rather naive and straightforward in terms of implementation, and therefore lacks any smart optimizations.
Obviously, with this approach when we search in all directions, tree gets huge pretty quick.

On M1 Mac with 8Gb RAM it was able to build full graph up to 8191 in somewhat reasonable 73s (only 17.5s to find path to single target), but failed to find path to next Mersenne number 131071 due to OOM.
