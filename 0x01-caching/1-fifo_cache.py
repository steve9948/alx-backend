#!/usr/bin/python3
"""Module for implementing a simple FIFO caching system"""

BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    """Class for a FIFO caching system that inherits from BaseCaching"""

    def __init__(self):
        """Initialize the FIFOCache class"""
        super().__init__()

    def put(self, key, item):
        """
        Add an item to the cache with the specified key
        If the cache exceeds its maximum size, the first item added
        will be removed (FIFO eviction policy).
        Args:
            key (str): The key for the cache item.
            item (any): The item to be cached.
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed = next(iter(self.cache_data))
                self.cache_data.pop(removed)
                print("DISCARD: {}".format(removed))
            self.cache_data[key] = item

    def get(self, key):
        """
        Retrieve an item from the cache by its key.

        Args:
            key (str): The key of the item to retrieve.
        Returns:
            any: The item associated with the key,
            or None if the key is not found.
        """
        return self.cache_data.get(key)
