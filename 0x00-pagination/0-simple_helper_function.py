#!/usr/bin/env python3
"""Helper function for pagination"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate start and end indices for a given page and page size.
    Parameters:
    page (int): The page number (1-indexed).
    page_size (int): The number of items per page.
    Returns:
    Tuple[int, int]: A tuple containing the start index and end index.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return start_index, end_index
