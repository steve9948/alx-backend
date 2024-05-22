#!/usr/bin/env python3
"""Module for implementing a simple MRU (Most Recently Used) caching system"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache class:
    Implements a caching system with a Most Recently
    Used (MRU) eviction policy.
    Inherits from BaseCaching and overrides the put and
    get methods to manage cache entries.
    """

    def __init__(self):
        """
        Initialize the MRUCache class.
        Sets up the parent class and initializes a list to
        keep track of recently used keys.
        """
        super().__init__()
        self.usage = []

    def put(self, key, item):
        """
        Cache a key-value pair in the MRU cache.

        If the cache is full and the key is not already in the cache,
        the least recently used item will be discarded.

        Args:
            key (str): The key for the cache item.
            item (any): The item to be cached.

        Returns:
            None
        """
        if key is None or item is None:
            pass
        else:
            length = len(self.cache_data)
            if length >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print("DISCARD: {}".format(self.usage[-1]))
                del self.cache_data[self.usage[-1]]
                del self.usage[-1]
            if key in self.usage:
                del self.usage[self.usage.index(key)]
            self.usage.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieve the value associated with a given key from the MRU cache.

        If the key is found, it becomes the most recently used.

        Args:
            key (str): The key to retrieve the value for.

        Returns:
            any: The value associated with the key, or None
            if the key is not found.
        """
        if key is not None and key in self.cache_data.keys():
            del self.usage[self.usage.index(key)]
            self.usage.append(key)
            return self.cache_data[key]
        return None
